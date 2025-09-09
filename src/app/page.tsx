export default function Home() {
  const niveaux = [
    'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6e', 
    '5e', '4e', '3e', '2nde', '1ère', 'Terminale'
  ];
  
  const themes = ['🇫🇷', '🔢', '🇬🇧', '🌍', '🔬', '🎵'];

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur EduQuiz</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Testez vos connaissances et apprenez en vous amusant avec nos quiz éducatifs !
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {niveaux.map((niveau) => (
          <div 
            key={niveau} 
            className="border rounded-lg p-6 hover:bg-accent/50 transition-colors cursor-pointer hover:shadow-md"
          >
            <h3 className="font-semibold text-xl mb-3 text-center">Niveau {niveau}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {themes.map((emoji) => (
                <span 
                  key={emoji} 
                  className="text-2xl" 
                  role="img" 
                  aria-hidden="true"
                >
                  {emoji}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3">
              Cliquez pour commencer
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
