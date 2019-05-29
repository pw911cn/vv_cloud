package com.senyint.vv_cloud.server_base.power_menu.action;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.senyint.frame_core.core.exception.CoreException;
import com.senyint.frame_core.core.support.CoreActionSupport;
import com.senyint.frame_core.core.vo.RequestInfoVo;
import com.senyint.frame_core.core.vo.ResponseInfoVo;
import com.senyint.vv_cloud.entity_base.pojo.PowerMenu;


/**
 * 
 * @desc:TODO 
 * @author: weiwei
 * version: V4.0
 * date: 2019年3月26日 下午11:57:02
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2019年3月26日       weiwei          4.0             1.0
 * modification
 */
@RestController
@RequestMapping("/powerMenu")
public class PowerMenuAction extends CoreActionSupport<PowerMenu> {

    @RequestMapping("/test")
    public ResponseInfoVo test() throws CoreException {

        ResponseInfoVo responseInfoVo = new ResponseInfoVo();
        //responseInfoVo.setDatas(powerMenuService.getById(menu_id));

        return responseInfoVo;
    }
    
    /**
     * 
     * @desc:TODO 
     * @author: peiwei
     * version: V4.0
     * date: 2019年3月7日 下午5:06:27
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月7日       peiwei          4.0             1.0
     * modification
     */
    @RequestMapping("/getById")
    public ResponseInfoVo getById(@RequestBody RequestInfoVo<PowerMenu> requestInfoVo) throws CoreException {
        //PowerMenu powerMenu = requestInfoVo.getParam();

        ResponseInfoVo responseInfoVo = new ResponseInfoVo();
        //responseInfoVo.setDatas(powerMenuService.getById(menu_id));

        return responseInfoVo;
    }

    /**
     * 
     * @desc:TODO 
     * @author: peiwei
     * version: V4.0
     * date: 2019年3月7日 下午4:56:17
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月7日       peiwei          4.0             1.0
     * modification
     */
    @RequestMapping("queryPageByCdn")
    public ResponseInfoVo queryPageByCdn() throws CoreException {
    
    
        ResponseInfoVo responseInfoVo = new ResponseInfoVo();
        return responseInfoVo;
    }

    /**
     * 
     * @desc:TODO 
     * @author: peiwei
     * version: V4.0
     * date: 2019年3月7日 下午5:31:44
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月7日       peiwei          4.0             1.0
     * modification
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public ResponseInfoVo add(@RequestBody RequestInfoVo<PowerMenu> request) throws CoreException {
        ResponseInfoVo responseInfoVo = new ResponseInfoVo();
        return responseInfoVo;
    }

    /**
     * 
     * @desc:TODO 
     * @author: peiwei
     * version: V4.0
     * date: 2019年3月7日 下午5:31:48
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月7日       peiwei          4.0             1.0
     * modification
     */
    @PostMapping("edit")
    public ResponseInfoVo edit(@RequestBody RequestInfoVo<PowerMenu> request) throws CoreException {
        ResponseInfoVo result = new ResponseInfoVo();
        return result;
    }

    @RequestMapping(value = "remove", method = RequestMethod.POST)
    public ResponseInfoVo remove(@RequestBody RequestInfoVo<PowerMenu> request) throws CoreException {
        ResponseInfoVo result = new ResponseInfoVo();
        return result;
    }

    @RequestMapping(value = "freeze", method = RequestMethod.POST)
    public ResponseInfoVo freeze(@RequestBody RequestInfoVo<PowerMenu> request) throws CoreException {
        ResponseInfoVo result = new ResponseInfoVo();
        return result;
    }

    @RequestMapping(value = "unfreeze", method = RequestMethod.POST)
    public ResponseInfoVo unfreeze(@RequestBody RequestInfoVo<PowerMenu> request) throws CoreException {
        ResponseInfoVo result = new ResponseInfoVo();
        return result;
    }

}
