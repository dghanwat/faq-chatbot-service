#
# Creates a docker container for the Portal
#

ARG DOCKERREPO=docker.io
FROM $DOCKERREPO/centos:7

ENV APP_HOME /var/portal/

ARG USENEXUS
RUN [ "$USENEXUS" != "true" ] && \
		(yum -y --setopt=tsflags=nodocs install epel-release) \
	|| \
		(rm -f /etc/yum.repos.d/*.repo && \
		echo '[base]' > /etc/yum.repos.d/nexus.repo && \
		echo 'name=Nexus Centos7 - Base' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.17.101:8081/repository/yum-centos7-base/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7' >> /etc/yum.repos.d/nexus.repo && \
		echo '[updates]' >> /etc/yum.repos.d/nexus.repo && \
		echo 'name=Nexus Centos7 - Updates' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.17.101:8081/repository/yum-centos7-updates/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7' >> /etc/yum.repos.d/nexus.repo && \
		echo '[epel]' >> /etc/yum.repos.d/nexus.repo && \
		echo 'name=Extra Packages for Enterprise Linux 7' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.17.101:8081/repository/yum-epel7/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=http://download.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-7' >> /etc/yum.repos.d/nexus.repo)

# Add the nodesource repository for latest node/npm version
RUN curl -sL https://rpm.nodesource.com/setup_9.x | bash -

RUN INSTALL_PKGS="nodejs" && \
    yum -y --setopt=tsflags=nodocs install $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum clean all  && \
    localedef -f UTF-8 -i en_US en_US.UTF-8

# Create a user to run the app
RUN groupadd -r portal_user -g 3001 && \
    useradd -u 3001 -r -g portal_user -m -d ${APP_HOME} -c "Run User" portal_user

# Add the build dist folder and package.json (for npm resolution)
ADD --chown=portal_user:portal_user dist ${APP_HOME}dist/
ADD --chown=portal_user:portal_user package.json ${APP_HOME}

RUN [ "$USENEXUS" != "true" ] || \
	(echo 'registry=http://10.0.17.101:8081/repository/npm-registry/' > ${APP_HOME}.npmrc && \
	echo '_auth=YWRtaW46a2dkamZnOTgzNDR1MzI0Yjg5Nzk=' >> ${APP_HOME}.npmrc && \
	chown portal_user:portal_user ${APP_HOME}.npmrc)

EXPOSE 3000

ENV PORT=3000
ENV KEEP_WSS_CONNECTION_ALIVE=5000 
ENV ENVIRONMENT=localdocker

WORKDIR ${APP_HOME}

USER portal_user

RUN npm install --no-optional --loglevel verbose

CMD node ${APP_HOME}dist/server/app.js
