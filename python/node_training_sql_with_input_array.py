from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import sys

chatbot = ChatBot(
    "Chatbot Backed by SQL Storage",
    database="./python/chatterbot_db.sqlite3",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    trainer='chatterbot.trainers.ListTrainer'
)
chatbot.set_trainer(ListTrainer)
conversations = sys.argv[1].split('\n')
chatbot.train(conversations)
