import React from 'react';

export default function VideoViewer({ url }) {
	return (
		<div className='video'>
			<iframe
				width='400'
				height='300'
				src={`${url}`}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='Embedded youtube'
			/>
		</div>
	);
}
