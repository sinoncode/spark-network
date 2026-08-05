import { motion } from "framer-motion";

interface TeamAvatarGroupProps {
    members: string[];
    maxVisible?: number;
    size?: "sm" | "md" | "lg";
}

const TeamAvatarGroup = ({
    members,
    maxVisible = 4,
    size = "md",
}: TeamAvatarGroupProps) => {
    const visibleMembers = members.slice(0, maxVisible);
    const remaining = members.length - maxVisible;

    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };

    const gradients = [
        "from-sky-500 to-blue-600",
        "from-violet-500 to-purple-600",
        "from-emerald-500 to-green-600",
        "from-pink-500 to-rose-600",
        "from-orange-500 to-amber-500",
        "from-cyan-500 to-indigo-500",
    ];

    return (
        <div className="flex items-center">
            {visibleMembers.map((member, index) => (
                <motion.div
                    key={member}
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: -10,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: index * 0.08,
                    }}
                    whileHover={{
                        y: -4,
                        scale: 1.08,
                        zIndex: 20,
                    }}
                    title={member}
                    className={`relative flex ${sizeClasses[size]} -ml-2 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-gradient-to-br ${gradients[index % gradients.length]
                        } font-semibold text-white shadow-lg first:ml-0 cursor-pointer select-none`}
                >
                    {member
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                </motion.div>
            ))}

            {remaining > 0 && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    className={`relative flex ${sizeClasses[size]} -ml-2 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-slate-200 font-semibold text-slate-700 dark:text-slate-200 shadow-lg`}
                >
                    +{remaining}
                </motion.div>
            )}
        </div>
    );
};

export default TeamAvatarGroup;