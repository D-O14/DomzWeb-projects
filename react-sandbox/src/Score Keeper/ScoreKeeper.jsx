import { useState } from "react";
import Button from "../Button/Button";
import styles from "./ScoreKeeper.module.css";

export default function ScoreKeeper() {
    const [scores, setScores] = useState({ teamA: 0, teamB: 0 });
    function addTeamAScore() { setScores(prevScore => ({...scores, teamA: prevScore.teamA + 1 }))};
    function addTeamBScore() { setScores(prevScore => ({ ...scores, teamB: prevScore.teamB + 1 }))};
    return (
        <>
            <div className={styles.scoreKeeper}>
                <h1>Score Keeper</h1>
                <menu className={styles.scoreCount}>
                    <label>Team One: {scores.teamA}</label>
                    <Button text="+1 Team One" func={() => { addTeamAScore() }} />
                    <label>Team Two: {scores.teamB}</label>
                    <Button text="+1 Team Two" func={() => { addTeamBScore() }} />
                </menu>
            </div>
        </>
    );
};