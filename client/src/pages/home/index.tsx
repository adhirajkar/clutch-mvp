import { motion } from 'framer-motion';
import { ArrowRight, Database, Shield, CreditCard, MessageCircle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {user, setUser} = useAuthStore();
  const {put} = useApi();
  const navigate = useNavigate();

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const plugins = [
    {
      title: "CRUD",
      description: "Complete Create, Read, Update, Delete operations",
      icon: Database,
      buttonText: "Convert to Admin",
      action: convertToAdmin
    },
    {
      title: "RBAC",
      description: "Role Based Access Control system",
      icon: Shield,
      buttonText: "Convert to Admin",
      action: convertToAdmin
    },
    {
      title: "Razorpay Payments",
      description: "Integrated payment processing solution",
      icon: CreditCard,
      buttonText: "Check Now",
      action: () => navigate('/razorpay-test')
    },
    {
      title: "Chat",
      description: "Real-time messaging and communication",
      icon: MessageCircle,
      buttonText: "Explore",
      action: () => toast.info("Coming soon!")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="text-center max-w-6xl w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-thin text-gray-800 mb-4 tracking-wide"
            animate={{
              textShadow: [
                "0 0 10px rgba(59, 130, 246, 0.0)",
                "0 0 15px rgba(59, 130, 246, 0.2)",
                "0 0 10px rgba(59, 130, 246, 0.0)"
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            CLUTCH
            <span className="text-blue-600 font-light"> MVP</span>
          </motion.h1>
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>

        <motion.p
          className="text-xl text-gray-600 mb-12 font-light tracking-wide"
          variants={itemVariants}
          animate={{
            opacity: [0.8, 1, 0.8]
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
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl text-gray-700 font-light tracking-wide mb-8"
          >
            Check Plugins
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {plugins.map((plugin, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group flex flex-col h-full"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 mx-auto"
                >
                  <plugin.icon className="w-6 h-6 text-white" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{plugin.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed text-center flex-grow">{plugin.description}</p>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={plugin.action}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plugin.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;