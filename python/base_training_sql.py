from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer


chatbot = ChatBot(
    "Chatbot Backed by SQL",
    database="./chatterbot_db.sqlite3",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer',
    filters=[
        'chatterbot.filters.RepetitiveResponseFilter'
    ]
)
chatbot.set_trainer(ChatterBotCorpusTrainer)
chatbot.train("chatterbot.corpus.english")
