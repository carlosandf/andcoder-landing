const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&part=snippet&maxResults=55';

const content = document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9081fc5416msh39094447f86985ep170c44jsn3f8230759def',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();

  return data;
}

(async () => {
  try {
    const playlist = await fetchData(API);

    let view = playlist.items.map(video => /*html*/`
      <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src=${video.snippet.thumbnails.high.url} alt=${video.snippet.description} class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </a>
    `).join('');

    console.log(view)
    content.innerHTML = view;

  } catch (error) {
    console.error(error)
  }
})();