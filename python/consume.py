import io
import websockets
import asyncio
import pandas as pd
import base64


def process(trades):
    # insert your own trade processor here
    print(trades)


async def connect():
    async with websockets.connect(
        "wss://stream.zash.sh",
        extra_headers={"x-api-key": "YOUR_API_KEY"},
    ) as ws:
        while True:
            raw = await asyncio.wait_for(ws.recv(), timeout=180)
            process(
                pd.read_parquet(io.BytesIO(base64.b64decode(raw))).to_dict(
                    orient="records"
                )
            )


asyncio.run(connect())
