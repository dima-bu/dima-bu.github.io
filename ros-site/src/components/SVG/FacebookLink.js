import React from 'react';

const FacebookLink = (props) => {
  const {link} = props;
  return (
  <a className="facebook-link" href={link}>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
      <path className="facebook-icon" fillRule="evenodd" d="M1.656 0C.74 0 0 .741 0 1.656v26.688C0 29.26.741 30 1.656 30h14.368V18.382h-3.91v-4.527h3.91v-3.34c0-3.874 2.367-5.984 5.823-5.984 1.656 0 3.08.123 3.494.178v4.05l-2.398.001c-1.88 0-2.244.893-2.244 2.204v2.89h4.484l-.584 4.528h-3.9V30h7.645C29.26 30 30 29.259 30 28.344V1.656C30 .74 29.259 0 28.344 0H1.656z"/>
    </svg>
  </a>
  )
}

export default FacebookLink;