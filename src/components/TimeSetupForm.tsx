import { useState } from "react";

interface TimeSetupFormProps {
  onStart: (start: Date, end: Date) => void;
}

const TimeSetupForm = ({ onStart }: TimeSetupFormProps) => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startDateTime || !endDateTime) {
      setError("Please fill in both start and end times.");
      return;
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date/time format.");
      return;
    }

    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }

    onStart(start, end);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 animate-fade-in-up opacity-0 [animation-delay:0.3s]">
      <div className="space-y-2 animate-fade-in opacity-0 [animation-delay:0.4s]">
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Hackathon Start Time
        </label>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/30"
        />
      </div>

      <div className="space-y-2 animate-fade-in opacity-0 [animation-delay:0.5s]">
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Hackathon End Time
        </label>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/30"
        />
      </div>

      {error && (
        <p className="text-destructive text-sm text-center animate-scale-in">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 text-lg hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] animate-fade-in opacity-0 [animation-delay:0.6s]"
      >
        Start Countdown 🚀
      </button>
    </form>
  );
};

export default TimeSetupForm;
