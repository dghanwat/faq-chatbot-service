from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import sys

chatbot = ChatBot(
    "Chatbot Backed by MongoDB",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database="chatterbot_db",
    database_uri="mongodb://192.168.99.100:27017/",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    trainer='chatterbot.trainers.ListTrainer'
)
chatbot.set_trainer(ListTrainer)
conversations = sys.argv[1].split('\n')
chatbot.train(conversations)
