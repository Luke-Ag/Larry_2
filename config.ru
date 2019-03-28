require './larry'
require 'faye'

use Faye::RackAdapter, :mount => '/faye', :timeout => 25

run ScoutingProject
