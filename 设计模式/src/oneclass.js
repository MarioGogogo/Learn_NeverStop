/**
 * 单例模式
 */
// 系统中被唯一使用
// 一个类只有一个实例
// 比如登陆框  购物车

public class SingleObject{
    private SingleObject(){

    }
    private SingleObject instance=null;
    public SingleObject getInstance(){
        if(instance == null){
            instance = new SingleObject();

        }
        return instance;
    }

    public void login(username,password){
      Systems.out.println("login...")
    }
}