import { useState, useEffect, useRef } from "react";

const COMMANDS: Record<string, string> = {
  help: 'the available commands are: "info", "projects", "contact", "quote", "help" and you can also use "clear" to refresh the screen. just input the selection as text and press enter like you would do in any type of chat or console window.',
  info: 'this is a terminal emulator written in HTML with CSS and JavaScript. you access this website by using text commands. use the command "help" to see what options are available at the moment. this console function could be integrated into basically any web-app you can imagine, and be customized to look in any way. see you around!',
  projects: 'you can check out our different projects online by going to <a class="text-white underline decoration-dotted hover:decoration-solid" href="https://www.youtube.com/@binarystate" target="_blank">https://www.youtube.com/@binarystate</a> or <a class="text-white underline decoration-dotted hover:decoration-solid" href="https://instagram.com/binarystate" target="_blank">https://instagram.com/binarystate</a> or <a class="text-white underline decoration-dotted hover:decoration-solid" href="https://www.tiktok.com/@binarystate" target="_blank">https://www.tiktok.com/@binarystate</a> and view any specific post or video.',
  contact: 'the easiest way to get in touch with us is to go through any of the youtube projects online, by just writing a comment on a video. theres also a discord hub here: <a class="text-white underline decoration-dotted hover:decoration-solid" href="https://discord.com/invite/VpxgEfayuq" target="_blank">https://discord.com/invite/VpxgEfayuq</a>, where you can chat with the rest of the community in a very user friendly way, even by creating just a temporary account.',
  clear: 'clearing screen',
  quote: 'quote'
};

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "The same boiling water that makes an egg turn hard will make a potato soft. - M. Robbins",
  "If I had more time, I would have written a shorter letter. — Pascal",
  "The trouble with programmers is that you can never tell what a programmer is doing until it is too late. - Seymour Cray",
  "You might not think programmers are artists, but programming is an extremely creative profession. Its logic-based creativity. – J.Romero",
  "An expert is a person who has made all the mistakes that can be made in a very narrow field. – N. Bohr",
  "Idiots admire complexity, a genius admires simplicity. - Terry Davis",
  "One of my most productive day's was throwing away 1000 lines of code. — Ken Thompson",
  "The city's central computer told you? R2D2, you know better than to trust a strange computer! - C3PO",
  "It works on my machine. - Unknown",
  "Programming isn't a zero-sum game. Teaching something to a fellow programmer doesn’t take it away from you. - John Carmack",
  "No amount of experimentation prove me right; a single experiment can prove me wrong. - A. Einstein",
  "Facts stands never on the side of authority. Where power have right, right have no power. - Aa. Aavaath",
  "Nothing puzzles me more than time and space and yet nothing troubles me less. - Charles Lamb",
  "Object-oriented programming is an exceptionally bad idea which could only have originated in state of California. - E. Dijkstra",
  "The more unintelligent a man is, the less mysterious our existence seems to him. - A. Schopenhauer",
  "The creation of a thousand forests is in one acorn. - R. W. Emerson",
  "Paradox of innovation is that it's accepted as innovation when it has become imitation. ― P. Scaruffi",
  "Scientific thought & its creation is the common and shared heritage of mankind. - Abdus Salam",
  "Without culture, and the relative freedom it implies, society, even when perfect, is but a jungle. This is why any authentic creation is a gift to the future. - Camus",
  "One cannot predict or forestall all the clever misinterpretations that others might put on one's words. The most that can be done is to alert honest people to the problem. - Thomas Sowell",
  "It's fine if you don't know, but you're fired if you can't even google it. - Unknown",
  "I was put on Earth to face the blank page. - Quentin Tarantino",
  "I have not failed, I've just found 10000 ways that wont work. - Edison",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - C. Thompson",
  "A stupid man's report of what a clever man says is never accurate since he unconsciously translates what he hears into something he can understand. - B. Russell",
  "Any organisation that designs a system will produce a design whose structure is a copy of the organisations communication structure. Rob C. Martin",
  "Low-level programming is good for the soul. - John Carmack",
  "Programming isn't about what you know, it's about what you can figure out. - Chris Pine",
  "There are two major products that come from Berkeley: LSD and UNIX. We don’t believe this to be a coincidence. - J. S. Anderson",
  "Simple things should be simple while complex things should be possible. - Alan Kay",
  "A personal computer isn't personal because it's small and portable, it's because you pour yourself into it. - Audrey Watters",
  "Some of the best programming is done on paper, really. Putting it into the computer is just a minor detail. - Max Kanat-Alexander",
  "Programming is about managing the complexity of the problem, laid upon complexity of the machine. Because of this most of our programming fails. - Eckel",
  "AI is the transformer of civilization. - Toba B.",
  "Developers, developers, developers. - Steve Ballmer",
  "The problem with object-oriented languages is they've got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle. - Joe Armstrong",
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. - Martin Golding",
  "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. – Antoine de Saint",
  "Great ideas often receive violent opposition from mediocre minds. - Albert Einstein",
  "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning. - R. Cook",
  "Be alone, that is the secret of invention; be alone, that is when ideas are born. – Nikola Tesla",
  "Confusion is part of programming. - Felienne Hermans",
  "Coding like poetry should be short and concise. - Santosh Kalwar"
];

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'terminal emulator v.13 loaded <br>input your command or "help":<br>' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputValue.toLowerCase().trim();
      
      if (!value) return;

      // Add user input to history
      const newHistory: HistoryItem[] = [
        ...history,
        { type: 'input', content: `> ${inputValue}` }
      ];

      const args = value.split(' ');
      const command = args[0];

      if (command === 'clear') {
        setHistory([{ type: 'output', content: 'terminal emulator v.13 loaded <br>input your command or "help":<br>' }]);
        setInputValue("");
        return;
      } else if (command === 'quote') {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        newHistory.push({ type: 'output', content: randomQuote });
      } else {
        const outputText = COMMANDS[command] || 'that command is not available, please use "help".';
        newHistory.push({ type: 'output', content: outputText });
      }

      setHistory(newHistory);
      setInputValue("");
    }
  };

  // Keep focus on input
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-white font-mono p-4 overflow-hidden cursor-text"
      onClick={handleContainerClick}
      style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace" }}
    >
      <div 
        ref={outputContainerRef}
        id="output-container" 
        className="max-h-[95vh] overflow-y-auto mb-4 scrollbar-none"
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className="mb-1 break-words text-[22px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ))}
      </div>
      
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-white font-mono text-[22px] p-0 caret-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
