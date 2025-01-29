import React, { useState } from "react";

export default function UpdateWords() {
    const [wordId, setWordId] = useState(''); // ID des zu aktualisierenden Worts
    const [newWord, setNewWord] = useState(''); // Das neue Wort

    const handleUpdate = (e) => {
        e.preventDefault();

        // Überprüfen, ob die ID und das neue Wort vorhanden sind
        if (!wordId || !newWord) {
            console.error("Fehlende Eingaben für ID oder neues Wort.");
            return;
        }

        const updatedData = {
            id: wordId, // ID des zu aktualisierenden Worts
            content: {
                word: newWord // Neues Wort
            }
        };

        fetch(`http://localhost:8080/words/documents`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData) // Sende die Aktualisierung
        })
        .then(response => {
            if (response.ok) {
                console.log("Wort erfolgreich aktualisiert.");
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Fehler beim Aktualisieren des Worts: ${text}`);
                });
            }
        })
        .catch(error => console.error("Fehler:", error));
    };

    return (
        <div>
            <h2>Wort aktualisieren</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="wordId">Wort ID: </label>
                    <input
                        type="text"
                        id="wordId"
                        value={wordId}
                        onChange={(e) => setWordId(e.target.value)}
                        placeholder="Gib die ID des zu aktualisierenden Worts ein"
                    />
                </div>
                <div>
                    <label htmlFor="newWord">Neues Wort: </label>
                    <input
                        type="text"
                        id="newWord"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        placeholder="Gib das neue Wort ein"
                    />
                </div>
                <button type="submit">Aktualisieren</button>
            </form>
        </div>
    );
}
