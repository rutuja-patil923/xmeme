const prod ={
    url: {
        API_URL:"https://x-meme-rutuja-patil.herokuapp.com/memes/"
    }
};

const dev ={
    url:{
        API_URL:"http://localhost:8081/memes/"
    }
    
};

export const config=process.env.NODE_ENV === 'development' ? dev:prod;

