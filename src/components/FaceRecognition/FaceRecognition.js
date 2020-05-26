import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' />
        {boxes.length > 0 || imageURL === '' ? (
          boxes.map((box, index) => (
            <div
              className='bounding-box'
              key={index}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}></div>
          ))
        ) : (
          <div>No face detected</div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
