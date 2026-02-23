import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bus,
  ArrowLeft,
  Send,
  Users,
  MapPin,
  SmilePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: number;
  sender: string;
  initials: string;
  message: string;
  time: string;
  isMe: boolean;
}

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
  const navigate = useNavigate();
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
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/user")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Aqaleem → Stadium</h1>
              <p className="text-[10px] text-muted-foreground">{onlineMembers.length} members online</p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setShowMembers(!showMembers)}
        >
          <Users className="h-4 w-4" />
        </Button>
      </header>

      {/* Members drawer */}
      {showMembers && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-b border-border bg-card px-4 py-3"
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Online Now</p>
          <div className="flex flex-wrap gap-2">
            {onlineMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-xs font-medium text-foreground">{m.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="mx-auto max-w-lg space-y-3">
          {/* Date separator */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-medium text-muted-foreground">Today</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}
            >
              {!msg.isMe && (
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-secondary text-[10px] font-semibold text-foreground">
                    {msg.initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] ${msg.isMe ? "items-end" : "items-start"}`}>
                {!msg.isMe && (
                  <p className="mb-0.5 text-[10px] font-semibold text-primary">{msg.sender}</p>
                )}
                <div
                  className={`rounded-2xl px-3.5 py-2 text-sm ${
                    msg.isMe
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-card border border-border text-foreground"
                  }`}
                >
                  {msg.message}
                </div>
                <p className={`mt-0.5 text-[9px] text-muted-foreground ${msg.isMe ? "text-right" : ""}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full border-border bg-card text-sm"
          />
          <Button
            variant="glow"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
