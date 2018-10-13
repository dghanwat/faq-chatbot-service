from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer

# chatbot = ChatBot('Basic Bot')
# chatbot.set_trainer(ChatterBotCorpusTrainer)
# chatbot.train("chatterbot.corpus.english")

chatbot = ChatBot(
    "Chatbot Backed by MongoDB",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database="chatterbot_db",
    database_uri="mongodb://192.168.99.100:27017/",
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    trainer='chatterbot.trainers.ListTrainer',
    filters=[
        'chatterbot.filters.RepetitiveResponseFilter'
    ]
)

data = open('qna-tree.txt').read()
conversations = data.strip().split('\n')
chatbot.set_trainer(ListTrainer)
chatbot.train(conversations)
