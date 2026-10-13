import zlib
import struct
import os
import math

def create_png(width, height, filename):
    # Generamos una imagen con fondo gradiente índigo y un portal / círculo central
    raw_data = bytearray()
    center_x = width / 2
    center_y = height / 2
    radius_outer = width * 0.38
    radius_inner = width * 0.28
    
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = math.sqrt(dx * dx + dy * dy)
            
            # Fondo redondeado / cuadrado suave
            corner_radius = width * 0.2
            # Borde o Portal
            if dist <= radius_outer and dist >= radius_inner:
                # Anillo verde portal / cian (#10b981)
                t = (dist - radius_inner) / (radius_outer - radius_inner)
                r = int(16 + t * (99 - 16))
                g = int(185 + t * (102 - 185))
                b = int(129 + t * (241 - 129))
                raw_data.extend([r, g, b, 255])
            elif dist < radius_inner:
                # Centro portal oscuro con destello
                raw_data.extend([30, 41, 59, 255])
            else:
                # Fondo principal púrpura / índigo (#4f46e5)
                # Gradiente vertical sutil
                t_y = y / height
                r = int(79 + t_y * 10)
                g = int(70 + t_y * 15)
                b = int(229 - t_y * 20)
                raw_data.extend([r, g, b, 255])

    def chunk(chunk_type, data):
        return (
            struct.pack(">I", len(data)) +
            chunk_type +
            data +
            struct.pack(">I", zlib.crc32(chunk_type + data) & 0xffffffff)
        )

    header = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    ihdr = chunk(b'IHDR', ihdr_data)
    idat = chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend = chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(header + ihdr + idat + iend)

os.makedirs('public/icons', exist_ok=True)
create_png(192, 192, 'public/icons/icon-192.png')
create_png(512, 512, 'public/icons/icon-512.png')
create_png(512, 512, 'public/icons/icon-maskable-512.png')
print("Icons generated successfully!")
