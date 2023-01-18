import React, { useState, useEffect } from "react";
import { Metric} from "./frontend-challenge";
import BackendService from "./frontend-challenge";
import MetricsForm from "./MetricsForm";
import { Link } from "react-router-dom";

//Path al file di configurazione

const backendService = new BackendService("challengeApiKey");

export const MetricsLista: React.FC = () => {
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

    //Funzione per eliminare una metrica
    const handleDelete = (id: string) => {
        backendService.deleteMetric(id).then(() => {
            setMetrics(metrics.filter((m) => m.id !== id));
        });
    };

    //Funzione per aggiornare una metrica
    const handleUpdate = (metric: Metric) => {
        backendService.updateMetric(metric).then(() => {
            setMetrics(metrics.map((m) => (m.id === metric.id ? metric : m)));
        });
    };

    //Page creata per lo step 3. Visualizzare la Lista delle metriche
    return (
        <div>
            {isLoading && <p>Loading metrics...</p>}
            <Link to="/"><button>Back to the List</button></Link>
            <MetricsForm onAdd={(metric) => {
                setMetrics([...metrics, metric]);
                backendService.addMetric(metric);
            }} />

            {!isLoading && (
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
                                    <td>
                                        <button onClick={() => handleDelete(metric.id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => handleUpdate(metric)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <input placeholder="id" onChange={(e) => metric.id = e.target.value} />
                                    <input placeholder="code" onChange={(e) => metric.code = e.target.value} />
                                    <input placeholder="amounts" type="number[]" onChange={(e) => metric.amounts?.push(parseInt(e.target.value))} />
                                    <input placeholder="date" type="date" onChange={(e) => metric.date = new Date(e.target.value)} />
                                </tr>
                            </div>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MetricsLista;
