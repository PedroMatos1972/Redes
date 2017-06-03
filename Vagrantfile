# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME = ENV['BOX_NAME'] || "centos/7"
SSH_PRIVKEY_PATH = ENV["SSH_PRIVKEY_PATH"]

$script = <<SCRIPT
user="$1"
if [ -z "$user" ]; then
    user=vagrant
fi
sudo yum update 
sudo yum install apt
sudo yum update 
sudo yum install -q -y apt-transport-https ca-certificates
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
sudo yum update
sudo yum install nodejs python-software-properties python g++ make software-properties-common nginx
sudo yum update 
sudo yum install gcc-c++ 
sudo yum install gcc-c++ make
sudo yum update 
sudo yum install git
sudo yum update 
sudo yum install epel-release
sudo yum update 
sudo yum -y install nodejs
sudo yum update 
sudo yum install npm
sudo yum update 
sudo yum install g++
sudo yum update 
sudo yum install build-essential
sudo yum update 
sudo yum -y install nginx
sudo yum update
sudo yum upgrade
SCRIPT

Vagrant::Config.run do |config|
  config.vm.box = BOX_NAME

  if SSH_PRIVKEY_PATH
      config.ssh.private_key_path = SSH_PRIVKEY_PATH
  end

  config.ssh.forward_agent = true
end

Vagrant::VERSION >= "1.1.0" and Vagrant.configure("2") do |config|

  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.provider :virtualbox do |vb, override|

    override.vm.provision :shell, :inline => $script

    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]

    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end
end
