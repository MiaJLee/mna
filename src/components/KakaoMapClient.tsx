'use client'

export default function KakaoMapClient() {
	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <style>
        body { margin: 0; padding: 0; }
        .root_daum_roughmap { width: 100% !important; }
        .wrap_map { width: 100% !important; }
        .wrap_map img { max-width: none; }
      </style>
    </head>
    <body>
      <div id="daumRoughmapContainer1773924971332"
           class="root_daum_roughmap root_daum_roughmap_landing"></div>
      <script charset="UTF-8"
              src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
      <script charset="UTF-8">
        new daum.roughmap.Lander({
          "timestamp" : "1773924971332",
          "key" : "j8wdyh7rse3",
          "mapWidth" : "365",
          "mapHeight" : "260"
        }).render();
      </script>
    </body>
    </html>
  `

	return (
		<iframe
			srcDoc={html}
			title="카카오맵 약도"
			className="w-full border-0"
			style={{ height: '260px' }}
			sandbox="allow-scripts allow-same-origin"
		/>
	)
}
