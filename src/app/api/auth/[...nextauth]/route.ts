import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Akun FrozBite",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@anda.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan Password wajib diisi");
        }

        await connectToDatabase();

        // Cari user di MongoDB
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Email belum terdaftar!");
        }

        // Cocokkan password yang diketik dengan password asli di database
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error("Password salah!");
        }

        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  pages: {
    signIn: '/login', // Kita arahkan ke halaman Login kustom kita nanti
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };