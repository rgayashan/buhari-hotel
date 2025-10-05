import { ImageResponse } from 'next/og';

export const size = 512;
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#b91c1c',
          color: 'white',
          fontSize: 220,
          fontWeight: 800,
          letterSpacing: -10,
        }}
      >
        BH
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}


