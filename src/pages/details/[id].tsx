import router from "next/router";

export default function Details() {
    return (
        <div>
        <h1>Details #{router.query.id}</h1>
        </div>
    );
    }
    