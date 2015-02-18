/**
MIT License (MIT)

Copyright (c) <2014> <Rapp Project EU>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Author: Athanassios Kintsakis
contact: akintsakis@issel.ee.auth.gr
**/

#include <knowrob_wrapper/knowrob_wrapper.h>
#include <rapp_platform_ros_communications/OntologySimpleQuerySrv.h>
#include <rapp_platform_ros_communications/DbWrapperSrv.h>
#include <rapp_platform_ros_communications/StringArrayMsg.h>
#include <ros/ros.h>

class KnowrobWrapperCommunications
{
  private:
    ros::NodeHandle nh_;    
    KnowrobWrapper knowrob_wrapper;

    
    ros::ServiceServer subclassesOfService_;    
    std::string subclassesOfServiceTopic_;
    
    ros::ServiceServer superclassesOfService_;    
    std::string superclassesOfServiceTopic_;
    
    ros::ServiceServer createInstanceService_;    
    std::string createInstanceServiceTopic_;
    
    ros::ServiceServer dumpOntologyService_;    
    std::string dumpOntologyServiceTopic_;
    
    ros::ServiceServer loadOntologyService_;    
    std::string loadOntologyServiceTopic_;
    
    ros::ServiceServer userInstancesFromClassService_;    
    std::string userInstancesFromClassServiceTopic_;   
    
    ros::ServiceServer assignAttributeValueService_;    
    std::string assignAttributeValueServiceTopic_;       
    //ros::ServiceServer instanceFromClassService_;    
    //std::string instanceFromClassServiceTopic_;
    
    

  public:

    KnowrobWrapperCommunications();

    bool subclassesOfCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool superclassesOfCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool createInstanceCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool dumpOntologyCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool loadOntologyCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool userInstancesFromClassCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
    bool assignAttributeValueCallback(
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Request& req,
      rapp_platform_ros_communications::OntologySimpleQuerySrv::Response& res);
      
      
};
