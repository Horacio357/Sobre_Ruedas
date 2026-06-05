import urllib.request
import os

urls = [
  "https://i.ibb.co/20FQHH7J/Roll-Line-Variant-M-2.png",
  "https://i.ibb.co/k6kfzjSg/Roll-Line-Variant-M-1.png",
  "https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png",
  "https://i.ibb.co/5hTWwVt2/Roll-Line-Variant-f-1.png",
  "https://i.ibb.co/1t9dF7fT/Roll-Line-Variant-f.png",
  "https://i.ibb.co/7xHB2Spv/Roll-Line-Variant-C-2.png",
  "https://i.ibb.co/9mcwRw0x/Roll-Line-Variant-C-1.png",
  "https://i.ibb.co/mrg0h3s0/Roll-Line-Variant-C.png",
  "https://i.ibb.co/kVDNXT7Z/Roll-Line-Spin-2.png",
  "https://i.ibb.co/6RPrdvS5/Roll-Line-Spin-1.png",
  "https://i.ibb.co/Y7qbvG2v/Roll-Line-Spin.png",
  "https://i.ibb.co/Y4NBJpvL/Roll-Line-Saturno.png",
  "https://i.ibb.co/nq9g9Td7/Roll-Line-Saturno.png",
  "https://i.ibb.co/HMs8SvT/Roll-Line-ruedas-magnum-4.png",
  "https://i.ibb.co/qL6cCZXX/Roll-Line-ruedas-magnum-3.png",
  "https://i.ibb.co/bjVtkfBr/Roll-Line-ruedas-magnum-2.png",
  "https://i.ibb.co/B5Jvgkrp/Roll-Line-ruedas-magnum-1.png",
  "https://i.ibb.co/jvMxyczh/Roll-Line-ruedas-magnum.png",
  "https://i.ibb.co/1Jtv6ptc/Roll-Line-ruedas-helium-1.png",
  "https://i.ibb.co/SDTQ8ZBB/Roll-Line-ruedas-helium.png",
  "https://i.ibb.co/21cx1KRz/Roll-Line-ruedas-giotto-2.png",
  "https://i.ibb.co/MyV1qWJR/Roll-Line-ruedas-giotto-1.png",
  "https://i.ibb.co/27x4zKRP/Roll-Line-ruedas-giotto.png",
  "https://i.ibb.co/tPhmhZQy/Roll-Line-ruedas-boxer-2.png",
  "https://i.ibb.co/twkfFR0L/Roll-Line-ruedas-boxer-1.png",
  "https://i.ibb.co/7NSXMRkk/Roll-Line-ruedas-boxer.png",
  "https://i.ibb.co/vCcLCJzm/Roll-Line-Mistral-2.png",
  "https://i.ibb.co/LdKwnRPZ/Roll-Line-Mirage.png",
  "https://i.ibb.co/YBjYgtjb/Roll-Line-Mirage.png",
  "https://i.ibb.co/JWZ7ZvF6/Roll-Line-Matrix.png",
  "https://i.ibb.co/7JyhBPwM/Roll-Line-Matrix-1.png",
  "https://i.ibb.co/S4fM9kns/Roll-Line-Matrix.png",
  "https://i.ibb.co/MkKdRKW4/Roll-Line-giotto-1.png",
  "https://i.ibb.co/wNm85s07/Roll-Line-giotto.png",
  "https://i.ibb.co/B515yXm1/Roll-Line-frenos-rosas.png",
  "https://i.ibb.co/KjhD9tg0/Roll-Line-frenos-grises.png",
  "https://i.ibb.co/GQXrTqM5/Roll-Line-Evo-1.png",
  "https://i.ibb.co/YTw3VGP8/Roll-Line-Evo.png",
  "https://i.ibb.co/8g4WfdjR/Roll-Line-Evo.png",
  "https://i.ibb.co/k6JJfjmn/Roll-Line-dance-2.png",
  "https://i.ibb.co/32Xp12P/Roll-Line-dance-1.png",
  "https://i.ibb.co/KpQ2QW3f/Roll-Line-dance.png",
  "https://i.ibb.co/PGVp2Q8C/Roll-Line-blaster-1.png",
  "https://i.ibb.co/pBDq0vdg/Roll-Line-blaster.png",
  "https://i.ibb.co/5xFRWWqw/Roll-Line-Avile.png",
  "https://i.ibb.co/Ld0FZxhC/Roll-Line-agile.png",
  "https://i.ibb.co/V07WxZt1/Roll-Line-agile.png",
  "https://i.ibb.co/84tmmn28/Risport-Venus.png",
  "https://i.ibb.co/Z4rXynv/Risport-Royal-pro.png",
  "https://i.ibb.co/NQHrh87/Risport-RF1-elite-1.png",
  "https://i.ibb.co/5g5VM78m/Risport-Gemma.png",
  "https://i.ibb.co/4wh55MjV/Risport-gemma.png",
  "https://i.ibb.co/d4VhV7bb/Dance-prime.png",
  "https://i.ibb.co/WvtzdycW/Risport-antares.png",
  "https://i.ibb.co/M5nrdD57/Risport-Ambra.png",
  "https://i.ibb.co/v62XwXnT/Magic-Eraser-260526-160524.png",
  "https://i.ibb.co/SwNbdXCN/Magic-Eraser-260526-160355.png",
  "https://i.ibb.co/JRmtZBYd/Magic-Eraser-260526-155332.png",
  "https://i.ibb.co/39rnGdV7/Magic-Eraser-260526-155309.png",
  "https://i.ibb.co/JwjdLSJ7/Magic-Eraser-260526-155252.png",
  "https://i.ibb.co/vxr81s5f/Magic-Eraser-260526-155236.png",
  "https://i.ibb.co/C54Scqzr/Magic-Eraser-260526-155217.png",
  "https://i.ibb.co/XZM3gCBV/Magic-Eraser-260526-155150.png",
  "https://i.ibb.co/PsDnrQJn/Magic-Eraser-260526-151943.png",
  "https://i.ibb.co/wFHxdLNN/Magic-Eraser-260526-151710.png",
  "https://i.ibb.co/Hf0BJyQ5/Magic-Eraser-260526-151540.png",
  "https://i.ibb.co/jsm3xFz/Magic-Eraser-260526-151301-1.png",
  "https://i.ibb.co/ZprqWBGs/Magic-Eraser-260526-151235.png",
  "https://i.ibb.co/Z6rSvcB0/Magic-Eraser-260526-151218.png",
  "https://i.ibb.co/C3M3DZ25/Magic-Eraser-260526-151204.png",
  "https://i.ibb.co/cKRFtfnD/Magic-Eraser-260526-151135.png",
  "https://i.ibb.co/HDGYg4Yw/Magic-Eraser-260526-151119-1.png",
  "https://i.ibb.co/S4phhGjZ/Bolso-Edea-always-with-me-2.png",
  "https://i.ibb.co/sv4GnzwL/Bolso-Edea-always-with-me-1.png",
  "https://i.ibb.co/8gcN7Lc1/Bolso-Edea-always-with-me.png"
]

dest_dir = os.path.join("apps", "web", "public", "images", "products", "new2")
os.makedirs(dest_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for u in urls:
    filename = u.split("/")[-1]
    dest = os.path.join(dest_dir, filename)
    if os.path.exists(dest):
        continue
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print("Downloaded " + filename)
    except Exception as e:
        print("Failed to download " + filename + ": " + str(e))
