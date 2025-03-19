import pandas as pd
import io
from database import RunClient, RunTimeSeriesData

async def process_csv(file, pump1_choice, pump2_choice, db):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")), skiprows=2, header=0)

    df.columns = df.columns.str.strip().str.replace(r"\s+", " ", regex=True)

    if "Time Stamp" not in df.columns:
        return {"error": "Invalid file format. 'Time Stamp' column missing."}

    df = df.dropna(subset=['Time Stamp'])

    filename_parts = file.filename.split("_")
    client_name, run_id = filename_parts[0], filename_parts[1]

    if not db.query(RunClient).filter(RunClient.run_id == run_id).first():
        db.add(RunClient(
            run_id=run_id,
            client_name=client_name,
            pump1_choice=pump1_choice,
            pump2_choice=pump2_choice
        ))
        db.commit()

    df_wide = df.pivot(index='Time Stamp', columns='Parameter', values='Process value').reset_index()
    df_wide.rename(columns={'Time Stamp': 'timestamp'}, inplace=True)

    required_cols = ['timestamp', 'pH', 'Pump1', 'Pump2', 'Temperature']
    for col in required_cols:
        if col not in df_wide:
            df_wide[col] = 0

    df_wide.fillna(0, inplace=True)

    for _, row in df_wide.iterrows():
        db.add(RunTimeSeriesData(
            run_id=run_id,
            time=float(row['timestamp']),
            pH=float(row['pH']),
            Pump1=str(row['Pump1']),
            Pump2=str(row['Pump2']),
            Temperature=float(row['Temperature'])
        ))

    db.commit()
    return {"message": f"File uploaded successfully for Run ID {run_id}"}