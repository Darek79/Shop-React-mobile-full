class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.queryObj = {};
  }
  filtering() {
    let queryStr = { ...this.queryString };
    let excludeFields = ['fo', 'pa', 'se', 'so', 'li', 'ca', 'sb', 'id','ac'];

    excludeFields.forEach((el) => delete queryStr[el]);
    this.query.find(this.queryObj);

    return this;
  }
  folder() {
    if (this.queryString.fo) {
      this.queryObj.folder = this.queryString.fo;
    }
    this.query.find(this.queryObj);
    return this;
  }
  category() {
    //console.log(this.queryString, "CLASS");
    if (this.queryString.ca) {
      this.queryObj.category = this.queryString.ca;
    }
    if (this.queryString.sb) {
      this.queryObj.subcategory = this.queryString.sb;
    }
    if (this.queryString.ac) {
      this.queryObj.artcategory = this.queryString.ac;
    }
    if (this.queryString.id) {
      this.queryObj.id = this.queryString.id;
    }
    this.query.find(this.queryObj);
    return this;
  }
  sorting() {
    if (this.queryString.so) {
      const s = this.queryString.so.split(',').join(' ');
      this.query.sort(s);
    } else {
      this.query.sort({ price: 'desc' });
    }
    return this;
  }
  limit() {
    if (this.queryString.se) {
      //console.log("here");
      this.query.select(this.queryString.se);
    } else {
      //console.log("here");
      this.query.select(['-wasVisited', '-_id', '-__v']);
    }
    return this;
  }
  pagination() {
    let page = this.queryString.pa * 1 || 1;
    let limit = this.queryString.li * 1 || 1;

    if (this.queryString.li) {
      this.query.limit(limit).skip((page - 1) * limit);
    } else {
      this.query.limit(8);
    }
    //console.log(this);
    return this;
  }
}

module.exports = APIfeatures;
