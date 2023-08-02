import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn(data) {
      console.log(data);
      await dbConnect();
      // If the user already exists in our database, simply
      // update the record with the name we got from GitHub.
      // If not, insert it with githubId and name!
      await User.findOneAndUpdate(
        {
          googleId: data.user.id,
        },
        { name: data.user.name },
        { new: true, upsert: true }
      );

      return true;
    },

    async session({ session, token }) {
      // Add the user's GitHub ID to the session
      session.user.googleId = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
