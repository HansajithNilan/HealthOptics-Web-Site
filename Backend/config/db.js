import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const connectDB = async () => {
    try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const conn  = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: `);
        
    } catch (error) {
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};
