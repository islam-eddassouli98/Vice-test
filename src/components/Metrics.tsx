import React, { useState, useEffect } from "react";
import { Metric,  } from "./frontend-challenge";
import BackendService from "./frontend-challenge";
import { Link } from "react-router-dom";

//Path al file di configurazione
const backendService = new BackendService("challengeApiKey");

type Props = {}

export const Metrics = (props: Props) => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    //Funzione per ottenere le metriche
    useEffect(() => {
        setIsLoading(true);
        backendService.getMetrics().then((data) => {
            setMetrics(data);
            setIsLoading(false);
        });
    }, []);
  return (
        <div>
            {isLoading && <p>Loading metrics...</p>}
            {!isLoading && (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Amounts</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map((metric) => (
                            <div>
                                <tr key={metric.id}>
                                    <td>{metric.id}</td>
                                    <td>{metric.code}</td>
                                    <td>{metric.amounts?.join(", ")}</td>
                                    <td>{metric.date.toLocaleDateString()}</td>
                                </tr>
                            </div>
                        ))}
                    </tbody>
                </table>
                <Link to="/metrics"><button>Operation</button></Link>
            </>
            )}
        </div>
    );
}

export default Metrics