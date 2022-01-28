export default async function handleLike(bandInfo) {
    const body = JSON.stringify({band: bandInfo.Name});
    fetch('https://outertownfest.com/api/like.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    }).then(response => response.text())
    .then((out) => {
      console.log('result:', out)
    })
    return true
}