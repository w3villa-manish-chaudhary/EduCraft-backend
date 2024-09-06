const getKivoConfig = () => {
    return {
      KIVO_CLIENT_ID: 'jEdkd6MP36uiWZJSFh4aYlh9gEaBF7LOX1Di83XdzYc',
      KIVO_CLIENT_SECRET: 'unmiJLCWXJlYEYhOqifdtieeo211SjrSiCeJDQK7k20',
      KIVO_PROVIDER_URL: 'https://staging.kivo.ai/',
      KIVO_AUTHORIZE_PATH: '/oauth/authorize',
      KIVO_CALLBACK_URL: 'https://wise-olives-melt.loca.lt/verify',
      KIVO_SCOPE: 'read',
      KIVO_TOKEN_HOST: process.env.KIVO_TOKEN_HOST, 
      KIVO_TOKEN_PATH:'/oauth/token',
      KIVO_SECRET_KEY:'ZXCVBNMASDFGHJKLQWERTYUIOP',
      
    };
  };

  module.exports = {
    getKivoConfig
  }
