<h1>🚕 TaxiResa</h1>
<p>
  <strong>TaxiResa</strong> est une petite interface web permettant aux utilisateurs de 
  <strong>faire une demande de réservation de taxi</strong>.<br>
  Ce dépôt existe principalement pour <strong>héberger l’application sur Vercel</strong>, 
  après une base générée dans <strong>Google AI Studio</strong>, puis adaptée manuellement
  pour l'entreprise <a href="https://letaxidestef.fr" target="_blank" rel="noopener noreferrer">
  https://letaxidestef.fr</a>.
</p>
<p>
  🔗 <strong>Site en ligne :</strong>
  <a href="https://taxiresa.letaxidestef.fr" target="_blank" rel="noopener noreferrer">
    https://taxiresa.letaxidestef.fr
  </a>
</p>
<hr>
<h2>⚠️ À propos de ce dépôt</h2>
<p>
  Ce repository <strong>ne contient pas le système de réservation complet</strong>.
</p>
<p>
  L’application dépend de workflows <strong>n8n</strong> privés, qui gèrent notamment :
</p>
<ul>
  <li>📧 l’envoi des emails de confirmation</li>
  <li>📱 l’envoi des SMS au chauffeur</li>
  <li>🗄️ l’enregistrement des réservations en base de données</li>
</ul>
<p>
  👉 <strong>Sans ces workflows n8n, le projet n’est pas fonctionnel.</strong><br>
  Le code présent ici sert uniquement de <strong>front-end</strong> pour le déploiement sur Vercel.
</p>
<hr>
<h2>🛠️ Stack technique</h2>
<ul>
  <li><strong>Vite</strong></li>
  <li><strong>React</strong></li>
  <li><strong>TypeScript</strong></li>
  <li><strong>Vercel</strong></li>
  <li><strong>n8n</strong> (automatisation)</li>
  <li><strong>Google AI Studio</strong> (génération initiale du squelette)</li>
</ul>
<hr>
<h2>📄 Licence</h2>
<p>
  Projet publié pour un <strong>usage personnel</strong>.<br>
  Cloner ce dépôt ne permet pas d’obtenir une solution prête à l’emploi.
</p>
<hr>
<h2>📦 Installation (interface uniquement)</h2>

⮕ Cloner le projet
<pre>
git clone https://github.com/nbuuuurg/taxi-calculator.git
</pre>
⮕ Aller dans le dossier
<pre>
cd taxi-calculator
</pre>
⮕ Installer les dépendances
<pre>
npm install
</pre>
⮕ Lancer le serveur de dev
<pre>
npm run dev<br>
</pre>
<p>
⚠️ Cela permet uniquement de lancer l'interface.  
Les réservations, emails et SMS ne fonctionneront pas sans les workflows privés n8n.
</p>
