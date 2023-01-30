import React from 'react';
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx = '124' cy = '124' r= '124'/>
        <rect x="0" y="257" rx="20" ry="20" width="250" height="34" />
        <rect x="0" y="315" rx="20" ry="20" width="250" height="84" />
        <rect x="0" y="410" rx="9" ry="9" width="120" height="40" />
        <rect x="153" y="410" rx="9" ry="9" width="100" height="40" />
    </ContentLoader>
)

export default Skeleton;