import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):

    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or \
        '\xc3\x0eF\x0c\xd8@\x9d\xc1`d+q\x04N\x1d\x15\x97\xd6\xfb\xa6S\x9ds\x89'
    PROPAGATE_EXCEPTIONS = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_TOKEN_LOCATION = ('cookies',)
    JWT_ACCESS_COOKIE_NAME = 'access_token'
    JWT_ACCESS_COOKIE_PATH = '/api'
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_ERROR_MESSAGE_KEY = 'message'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=3600)

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):

    ENV = 'development'
    DEBUG = True
    SQLALCHEMY_ECHO = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=7200)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'db.sqlite')


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'db-test.sqlite')


class ProductionConfig(Config):

    ENV = 'production'
    DEBUG = False
    JWT_COOKIE_SECURE = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'db.sqlite')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
