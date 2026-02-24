import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bus,
  Send,
  Users,
  MapPin,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserLayout from "@/components/layout/UserLayout";

interface ChatMessage {
  id: number;
  sender: string;
  initials: string;
  message: string;
  time: string;
  isMe: boolean;
}

const adminAnnouncement = "🚌 Reminder: Return trip at 7:00 PM has been added for Wednesday. Register before 2:00 PM!";

const initialMessages: ChatMessage[] = [
  { id: 1, sender: "Omar K.", initials: "OK", message: "Anyone know if the bus was late yesterday on the Aqaleem route?", time: "8:12 AM", isMe: false },
  { id: 2, sender: "Noor S.", initials: "NS", message: "Yeah it was about 5 min late at Al-Rawda Square", time: "8:14 AM", isMe: false },
  { id: 3, sender: "You", initials: "SA", message: "Thanks for the heads up! I'll leave a bit earlier today.", time: "8:15 AM", isMe: true },
  { id: 4, sender: "Lina M.", initials: "LM", message: "Registration just opened for tomorrow btw 🚌", time: "8:20 AM", isMe: false },
  { id: 5, sender: "Omar K.", initials: "OK", message: "Already registered! See you all on the bus", time: "8:22 AM", isMe: false },
  { id: 6, sender: "Noor S.", initials: "NS", message: "Does anyone know the return time options? 3:30 or 7?", time: "8:25 AM", isMe: false },
  { id: 7, sender: "You", initials: "SA", message: "Both are available. I usually take the 3:30 PM one.", time: "8:26 AM", isMe: true },
];

const onlineMembers = [
  { name: "Omar K.", initials: "OK" },
  { name: "Noor S.", initials: "NS" },
  { name: "Lina M.", initials: "LM" },
  { name: "You", initials: "SA" },
];

const UserChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: messages.length + 1,
      sender: "You",
      initials: "SA",
      message: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <UserLayout title="Route Chat" subtitle="Aqaleem → Stadium">
      <div className="max-w-2xl flex flex-col" style={{ height: "calc(100vh - 10rem)" }}>
        {/* Sticky admin announcement */}
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-3 flex items-start gap-3 mb-4">
          <Megaphone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">Admin Announcement</p>
            <p className="text-xs text-foreground">{adminAnnouncement}</p>
          </div>
        </div>

        {/* Online members toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs text-muted-foreground">{onlineMembers.length} online</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowMembers(!showMembers)}>
            <Users className="h-3.5 w-3.5" /> Members
          </Button>
        </div>

        {showMembers && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-3 flex flex-wrap gap-2">
            {onlineMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-xs font-medium text-foreground">{m.name}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 rounded-xl border border-border bg-card/50 p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-medium text-muted-foreground">Today</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                {!msg.isMe && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-secondary text-[10px] font-semibold text-foreground">{msg.initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[75%] ${msg.isMe ? "items-end" : "items-start"}`}>
                  {!msg.isMe && <p className="mb-0.5 text-[10px] font-semibold text-primary">{msg.sender}</p>}
                  <div className={`rounded-2xl px-3.5 py-2 text-sm ${msg.isMe ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary border border-border text-foreground"}`}>
                    {msg.message}
                  </div>
                  <p className={`mt-0.5 text-[9px] text-muted-foreground ${msg.isMe ? "text-right" : ""}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full border-border bg-card text-sm"
          />
          <Button variant="glow" size="icon" className="h-10 w-10 shrink-0 rounded-full" onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserChat;
