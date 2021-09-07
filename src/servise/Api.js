export default class Api {
  BASEURL = 'https://conduit.productionready.io/api/';

  finalUrl = (endUrl, param = '') => `${this.BASEURL}${endUrl}?${param}`;

  async request(url, method, value = null) {
    const res = await fetch(url, this.getOptions(method, value));
    return res;
  }

  getOptions = (method, value) => {
    if (method === 'POST') {
      return {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(value),
      };
    }

    if (method === 'PUT') {
      return {
        method,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(value),
      };
    }

    if (localStorage.getItem('token')) {
      return {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      };
    }
    return {
      method,
    };
  };

  async getArticles(page = 1) {
    const offset = (page - 1) * 20;
    const endUrl = this.finalUrl('articles', `offset=${offset}`);
    const res = await this.request(endUrl);
    const json = await res.json();
    return json;
  }

  async getArticle(slug = '') {
    const endUrl = this.finalUrl(`articles/${slug}`);
    const res = await this.request(endUrl);
    const json = await res.json();
    return json;
  }

  async userRegistration(user) {
    const url = this.finalUrl('users');

    const res = await this.request(url, 'POST', user);
    return res;
  }

  async userAuthentication(user) {
    const url = this.finalUrl('users/login');
    const res = await this.request(url, 'POST', user);
    return res;
  }

  async userUpdate(user) {
    const url = this.finalUrl('user');
    const res = await this.request(url, 'PUT', user);
    return res;
  }

  async getProfileFetch() {
    if (localStorage.getItem('token')) {
      const url = this.finalUrl('user');
      const res = await this.request(url);
      return res;
    }
    return 0;
  }
}
