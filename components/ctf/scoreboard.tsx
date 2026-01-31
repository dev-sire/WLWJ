"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award } from "lucide-react"

interface Team {
  rank: number
  name: string
  points: number
  solves: number
}

interface ScoreboardProps {
  teams: Team[]
  accentColor: string
}

export function Scoreboard({ teams, accentColor }: ScoreboardProps) {
  const topThree = teams.slice(0, 3)
  const rest = teams.slice(3)

  const podiumOrder = [1, 0, 2] // 2nd, 1st, 3rd
  const heights = ["h-32", "h-40", "h-24"]
  const icons = [Medal, Trophy, Award]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Scoreboard</h2>
          <p className="text-white">Final standings from the competition</p>
        </motion.div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-16">
          {podiumOrder.map((index, i) => {
            const team = topThree[index]
            if (!team) return null
            const Icon = icons[index]

            return (
              <motion.div
                key={team.rank}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="glass rounded-2xl p-4 mb-4 text-center min-w-35">
                  <Icon
                    size={32}
                    className={
                      index === 0
                        ? "text-yellow-500 mx-auto mb-2"
                        : index === 1
                          ? "text-gray-400 mx-auto mb-2"
                          : "text-amber-700 mx-auto mb-2"
                    }
                  />
                  <h3 className="font-semibold text-sm mb-1 truncate max-w-35">{team.name}</h3>
                  <p className="text-2xl font-bold" style={{ color: accentColor }}>
                    {team.points}
                  </p>
                  <p className="text-xs text-muted-foreground">{team.solves} solves</p>
                </div>
                <div
                  className={`${heights[index]} w-24 rounded-t-xl flex items-center justify-center text-3xl font-bold`}
                  style={{ background: `linear-gradient(to top, ${accentColor}40, ${accentColor}10)` }}
                >
                  {team.rank}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Rest of leaderboard */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 text-sm font-medium text-yellow-500">
              <span>Rank</span>
              <span className="col-span-2">Team</span>
              <span className="text-right">Points</span>
            </div>
            {rest.map((team, index) => (
              <motion.div
                key={team.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <span className="text-yellow-500">#{team.rank}</span>
                <span className="col-span-2 font-medium">{team.name}</span>
                <span className="text-right" style={{ color: accentColor }}>
                  {team.points}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
