import { IME_APLIKACIJE } from "../constants";

export default function Home() {
    return (
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '60px auto' }}>
            <h1 style={{ fontSize: '3rem' }}>🎵</h1>
            <h2>{IME_APLIKACIJE}</h2>
            <p className="lead text-muted">
                Evidencija glazbenih albuma
            </p>
        </div>
    )
}
