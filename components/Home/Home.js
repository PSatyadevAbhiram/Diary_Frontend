import { useEffect, useState } from "react";

function Home(){
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [newDiaryTextEntry, setnewDiaryTextEntry] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:8081/api/entries');
                if(!response.ok){
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setDiaryEntries(data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        // Find the diary entry for the selected date, if it exists
        const selectedEntry = diaryEntries.find((entry) => entry.date === e.target.value);
        setnewDiaryTextEntry(selectedEntry ? selectedEntry.text : '');
    };

    const handleTextChange = (e) => {
        setnewDiaryTextEntry(e.target.value);
    };

    const handleSave = async () => {

        const newEntry = {
            id: diaryEntries.length + 1,
            date: selectedDate,
            text: newDiaryTextEntry
        };


        try{
            const response = await fetch('http://localhost:8081/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry),
            });

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
        }
        catch(error){
            console.log(error);
        }

        setDiaryEntries([...diaryEntries, newEntry]);
    }

    const maxDate = new Date().toISOString().split('T')[0];

    return(
        <div>
            <h1>Diary Entries</h1>
            {/* Date Picker */}
            <label>Select Date:</label>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={maxDate}
            />

            {/* Text Area */}
            <label>Today's Diary Entry:</label>
            <textarea
                value={newDiaryTextEntry}
                onChange={handleTextChange}
                rows={5}
                cols={50}
                placeholder="Please enter your diary entry here."
            />

            {/* Save Button */}
            <button onClick={handleSave}>Save my day</button>

        </div>
    )
}

export default Home;