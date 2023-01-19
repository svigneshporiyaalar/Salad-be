const db = require('../models');
const Role = db.role;
const Op = db.Sequelize.Op;

const userHelper = (page, limit, q) => {
  const findCondition = {
    include: [Role],
  };

  if (page && limit) {
    (findCondition.offset = (+page - 1) * +limit),
      (findCondition.limit = +limit),
      (findCondition.subQuery = false);
  }

  if (q) {
    findCondition.where = {
      [Op.and]: [
        { '$roles.name$': 'user' },
        {
          [Op.or]: [
            {
              email: db.sequelize.where(
                db.sequelize.fn('LOWER', db.sequelize.col('email')),
                'LIKE',
                '%' + q.toLowerCase() + '%'
              ),
            },
            {
              firstname: db.sequelize.where(
                db.sequelize.fn('LOWER', db.sequelize.col('firstname')),
                'LIKE',
                '%' + q.toLowerCase() + '%'
              ),
            },
            {
              lastname: db.sequelize.where(
                db.sequelize.fn('LOWER', db.sequelize.col('lastname')),
                'LIKE',
                '%' + q.toLowerCase() + '%'
              ),
            },
          ],
        },
      ],
    };
  } else {
    findCondition.where = { '$roles.name$': 'user' };
  }

  return findCondition;
};

module.exports = userHelper;
