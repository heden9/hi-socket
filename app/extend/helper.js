'use strict';

module.exports = {
  getSaveKey(id1, id2) {
    if (+id1 > +id2) {
      return `${id1}_${id2}`;
    }
    return `${id2}_${id1}`;
  },
};
