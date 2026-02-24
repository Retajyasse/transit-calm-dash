import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Send, CheckCircle2, Clock, MessageSquare, ChevronDown } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I register for a trip?", a: "Navigate to the 'Book Trip' page from the sidebar. Select your route and pickup point, then confirm your booking. Registration is open daily from 12:00 AM to 2:00 PM." },
  { q: "Can I cancel my registration?", a: "Yes, you can cancel your registration anytime before the bus departs. Go to 'My Trips', find the upcoming trip, and click 'Cancel'." },
  { q: "What are the return trip options?", a: "Two return times are available: 3:30 PM and 7:00 PM. You must select one when booking." },
  { q: "What happens if I miss my bus?", a: "Your trip will be marked as 'Missed' in your attendance record. Frequent misses may affect your booking privileges." },
  { q: "How do I change my pickup point?", a: "Go to Settings and submit a route change request. Changes are reviewed by admin and take effect the following day." },
];

interface Ticket {
  id: number;
  subject: string;
  status: "open" | "resolved";
  date: string;
}

const initialTickets: Ticket[] = [
  { id: 1, subject: "Bus was late at Al-Rawda Square", status: "resolved", date: "Feb 20" },
  { id: 2, subject: "Unable to cancel booking", status: "open", date: "Feb 23" },
];

const UserSupport = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    const newTicket: Ticket = {
      id: tickets.length + 1,
      subject: subject.trim(),
      status: "open",
      date: "Today",
    };
    setTickets([newTicket, ...tickets]);
    setSubject("");
    setDescription("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <UserLayout title="Support" subtitle="Help center & tickets">
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card-solid p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Frequently Asked Questions</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-0">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-sm text-foreground hover:no-underline py-3">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Submit Ticket */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-solid p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">Submit a Ticket</h3>
            </div>

            {submitted && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-4 rounded-lg border border-success/20 bg-success/5 p-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <p className="text-xs text-success font-medium">Ticket submitted successfully!</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="h-10 w-full rounded-lg border border-border bg-secondary pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more details..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                />
              </div>
              <Button type="submit" variant="glow" className="w-full" disabled={!subject.trim()}>
                <Send className="h-4 w-4" /> Submit Ticket
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Tickets list */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-solid p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">Your Tickets</h3>
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-semibold text-foreground">No tickets yet</p>
              <p className="text-xs text-muted-foreground mt-1">Submit a ticket above to get help</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${ticket.status === "open" ? "bg-primary/10" : "bg-success/10"}`}>
                      {ticket.status === "open" ? <Clock className="h-4 w-4 text-primary" /> : <CheckCircle2 className="h-4 w-4 text-success" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{ticket.subject}</p>
                      <p className="text-[10px] text-muted-foreground">{ticket.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold rounded-full px-2.5 py-1 ${
                    ticket.status === "open" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                  }`}>
                    {ticket.status === "open" ? "Open" : "Resolved"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default UserSupport;
