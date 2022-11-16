import React from 'https://esm.sh/react@18.2.0?deno-std=0.140.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.2/mod.ts'
import { corsHeaders } from '../_shared/cors.ts'

const BACKGROUND_IMAGE_STD =
  'https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/images/lw6/lw6_og_bg.png'
const BACKGROUND_IMAGE_GOLDEN =
  'https://pbs.twimg.com/profile_banners/1219566488325017602/1662536044/1500x500' // TODO
const SUPA_CHECKMARK =
  'https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/images/lw6/supaverified.png'

export function handler(req: Request) {
  const url = new URL(req.url)
  const ticketNumber = url.searchParams.get('ticketNumber')
  const username = url.searchParams.get('username') ?? url.searchParams.get('amp;username')
  const name = url.searchParams.get('name') ?? url.searchParams.get('amp;name')
  const golden = url.searchParams.get('golden') ?? url.searchParams.get('amp;golden')

  if (!username || !ticketNumber || !name)
    return new Response(JSON.stringify({ error: 'missing params' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })

  const numDigits = `${Number(ticketNumber)}`.length
  const prefix = `00000000`.slice(numDigits)

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: '2000px',
            height: '1000px',
            backgroundColor: '#000',
            color: '#fff',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background image  */}
          <img
            width="2000"
            height="1000"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '-9000',
            }}
            src={golden ? BACKGROUND_IMAGE_GOLDEN : BACKGROUND_IMAGE_STD}
          />
          {/* GitHub Avatar image */}
          <img
            width="270"
            height="270"
            style={{
              position: 'absolute',
              top: '360',
              left: '460',
              borderRadius: 135,
            }}
            src={`https://github.com/${username}.png`}
          />
          {/* Name & username */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '380',
              left: '800',
              width: '600',
              height: '270',
              overflow: 'hidden',
              textOverflow: 'clip',
            }}
          >
            <p
              style={{
                fontSize: '70',
                lineHeight: 0.9,
              }}
            >
              {name}
            </p>
            {/* Username and supaverified checkmark */}
            <div
              style={{
                display: 'flex',
                fontSize: '35',
              }}
            >
              <span>{`@${username}`}</span>
              <span
                style={{
                  marginTop: '5',
                  marginLeft: '10',
                }}
              >
                <img width="44" height="44" src={SUPA_CHECKMARK} />
              </span>
            </div>
          </div>
          {/* Date  */}
          <p
            style={{
              position: 'absolute',
              top: '750',
              left: '800',
              fontSize: '20',
            }}
          >
            December 12th, 2022
          </p>
          {/* URL  */}
          <p
            style={{
              position: 'absolute',
              top: '750',
              left: '1150',
              fontSize: '20',
            }}
          >
            supabase.com/launch-week
          </p>
          {/* Ticket No  */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '385',
              right: '60',
              width: '705',
              height: '215',
              transform: 'rotate(90deg)',
            }}
          >
            <p
              style={{
                fontSize: '80',
              }}
            >
              {`№ ${prefix}${ticketNumber}`}
            </p>
          </div>
        </div>
      ),
      {
        width: 2000,
        height: 1000,
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=31536000, no-transform, immutable',
        },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}
