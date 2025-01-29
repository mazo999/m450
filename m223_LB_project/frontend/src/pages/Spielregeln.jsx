import React from 'react';

const Spielregeln = () => {
  return (
    <div>
      <h1>Spielregeln für Hangman</h1>
      <ol>
        <li>Ziel des Spiels ist es, ein verborgenes Wort zu erraten, bevor die maximale Anzahl an Fehlversuchen erreicht ist.</li>
        <li>Das Wort besteht aus mehreren Buchstaben, die als Striche angezeigt werden.</li>
        <li>Für jeden richtig geratenen Buchstaben wird der Buchstabe im Wort angezeigt.</li>
        <li>Bei einem falschen Buchstaben wird ein Teil der Henkersfigur gezeichnet.</li>
        <li>Der Spieler hat nur eine begrenzte Anzahl von Fehlversuchen (in der Regel 6 bis 10).</li>
        <li>Das Spiel ist gewonnen, wenn das gesamte Wort vor den maximalen Fehlversuchen erraten wird.</li>
        <li>Das Spiel ist verloren, wenn alle Teile der Henkersfigur gezeichnet sind.</li>
        <li>Nach dem Spiel kann der Spieler ein neues Spiel starten.</li>
      </ol>
    </div>
  );
}

export default Spielregeln;
