import React from 'react'

export default function ArtistInfo({ info }) {
    console.log('ArtistInfo: ', info);
    return (
        <div>
            <img src={info.images[0].url} height='400' width='400' className='cover' />>
            <a href={info.external_urls.spotify}> <h2> {info.name} </h2> </a>
            <div> {'Followers:' + info.followers.total} </div>
            <div> {'Popularity level: ' + info.popularity} </div>
                <ul> {info.genres.map(genre => (
                <li key={genre}>
                    {genre}
                </li>
            ))}
            </ul>
        </div>
    )
}