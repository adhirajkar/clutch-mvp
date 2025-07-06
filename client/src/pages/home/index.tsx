import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const Home = () => {
  const {user, setUser} = useAuthStore();
  const {put} = useApi();

  const convertToAdmin = async () => {
    if(!user) return;
    const res = await put(`/api/auth/convert-to-admin`, {
      body: {
        id: user._id
      }
    });
    console.log(res);
    if(res.success){
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-red-500/5 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/5 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="text-center max-w-2xl relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide"
            animate={{
              textShadow: [
                "0 0 10px rgba(59, 130, 246, 0.0)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 10px rgba(59, 130, 246, 0.0)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            CLUTCH
            <span className="text-blue-400 font-light"> MVP</span>
          </motion.h1>
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>

        <motion.p
          className="text-xl text-gray-300 mb-12 font-light tracking-wide"
          variants={itemVariants}
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Create Projects. Build Future.
        </motion.p>

        <motion.div
          className="flex justify-center items-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 font-light text-lg tracking-wide transition-all duration-500 shadow-lg hover:shadow-blue-500/20 group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.0)",
                "0 0 30px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0.0)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={convertToAdmin}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            <span className="relative z-10 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              CONVERT TO ADMIN
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-gray-400 font-light tracking-wide text-sm"
            animate={{
              color: ["#9ca3af", "#3b82f6", "#9ca3af"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Convert this user to admin to access the CRM
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;