import { connection } from "../Database/db.js";
import RentalSchema from '../Schemas/RentalSchema.js';

async function rentalMiddleware (req,res,next){
    const { customerId, gameId, daysRented } = req.body;

    if(!RentalSchema) {
        return res.status(400);
    };
    const gameInfo = await connection.query(
        "SELECT * FROM games WHERE id = $1;",
        [gameId]
      );
      const originalPrice = gameInfo.rows[0].pricePerDay * daysRented;
      const info2 = await connection.query(
        `SELECT games."pricePerDay", games."stockTotal" FROM customers, games WHERE games.id = $1 AND customers.id=$2;`,
        [gameId, customerId]
      );
      const rentals = await connection.query(
        `SELECT "gameId" FROM rentals WHERE "gameId" = $1;`,
        [gameId]
      );
      const newRentals = await connection.query(
        `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ( $1, $2, $3, $4, $5);`,
        [customerId, gameId, new Date(), parseInt(daysRented), originalPrice]
      );
      next()
};
export default rentalMiddleware;